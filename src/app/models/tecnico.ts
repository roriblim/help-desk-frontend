export interface Tecnico{
    id?: any; //passamos a interrogacao porque nem sempre teremos o id do tecnico. ex.: na hora de criar. o any é pq pode ser inteiro ou string.
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    perfis: any[]; //pode ser string ou inteiro
    dataCriacao: any; //colocamos any porque vamos trabalhar com string e com date
}