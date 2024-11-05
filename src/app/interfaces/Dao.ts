

export interface DAO {
  save:() => void
  find:(id: number) => any
  update:(Obj: any) => void
  delete: (id: number) => void 
}