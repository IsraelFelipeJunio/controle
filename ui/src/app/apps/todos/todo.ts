export class ToDo {
    id: number=0;
    public message: string='';
    public completionStatus: boolean=false;
    public edit: boolean=false;
    public date: Date|null=null;
}