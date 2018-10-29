export interface Client {
  id: string
  name: string
  type: string
  email: string
  date_create: string
  status: string
  telefones: Phone[]
  group: string
  cpf: string
  cnpj: string
  rg: string
  ie: string
}

export interface Phone {
  ddd: string
  number: string
}