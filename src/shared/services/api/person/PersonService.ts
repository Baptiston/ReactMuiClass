import { Environment } from '../../../environment';
import { Api } from '../axios-config/index';

export interface IListPerson{
  id: number
  nomeCompleto:string
  email:string
  cidadeId:number
}

export interface IDetailPerson{
  id: number
  nomeCompleto:string
  email:string
  cidadeId:number
}

export type TTotalCountPerson = {
  data:IListPerson[]
  totalCount: number
}

const getAll = async (page=1, filter = '') :  Promise<TTotalCountPerson | Error>  => {
  try {
    const { data, headers } = await Api.get(`/pessoas?_page=${page}&_limit=${Environment.ROW_LIMIT}&nomeCompleto_like=${filter}`);
    
    if(data){
      return{
        data, 
        totalCount: Number(headers['x-total-count']) | Environment.ROW_LIMIT
      };
    }

    return new Error('Erro ao listar os registros !');
  } catch (error) {
    console.error();
    return new Error((error as {message:string}).message || 'Erro ao listar os registros !');
  }
};

const getById = async (id: number) :  Promise<IDetailPerson | Error>  => {
  try {
    const { data } = await Api.get(`/pessoas/${id}`);
    
    if(data){
      return{
        id: data.id,
        nomeCompleto: data.nomeCompleto,
        email: data.email,
        cidadeId: data.cidadeId
      };
    }
    
    return new Error('Erro ao buscar a pessoa especificada !');
  } catch (error) {
    console.error();
    return new Error((error as {message:string}).message || 'Erro ao buscar a pessoa especificada !');
  }
};

const create = async (person: Omit<IDetailPerson, 'id'>) :  Promise<number | Error>  => {
  try {
    const { data } = await Api.post('/pessoas', person);

    if(data){
      return data.id;
    }

    return new Error('Erro ao inserir a pessoa informada !');
  } catch (error) {
    console.error();
    return new Error((error as {message:string}).message || 'Erro ao inserir a pessoa informada !');
  }
};

const updateById = async (id: number, data: IDetailPerson) :  Promise<void | Error>   => {
  try {
    await Api.put(`/pessoas/${id}`, data);
  } catch (error) {
    console.error();
    return new Error((error as {message:string}).message || 'Erro ao alterar a pessoa informada !');
  }
};

const deleteById = async (id: number) :  Promise<void | Error>  => {
  try {
    await Api.delete(`/pessoas/${id}`);
  } catch (error) {
    console.error();
    return new Error((error as {message:string}).message || 'Erro ao deletar a pessoa informada !');
  }
};

export const PersonService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};