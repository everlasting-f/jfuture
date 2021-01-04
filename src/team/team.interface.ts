import { AuthuserInterface } from "src/auth/auth.interface";
import { Dbinterface } from "src/common/db.elasticinterface";
import { UserInfo, UserInfoInterface, UserInterface } from "src/user/user.interface";

export interface TeamInfo {
    hash: string;
    range: string;
    index: string;  
    role:string
  }

  export interface Teaminfo {
    hash: string;
    range: string;
    index: string;  
  }
export interface TeamInfoInterface {
  hash?: string;
  range?: string;
  index?: string;
  teamMemberKey?:Teaminfo,   
  teamname:string,
  projectname:string,
  projectprogress:string,
  // membername:any,
}

export interface TeamMember{
  hash?:string;
  range?:string;
  index?:string; 
  TeamMemberName?:string;
  position?:string;
  TeamKey?:Teaminfo;
  AuthKey: Dbinterface;
  role?: 'menber' | 'admin' | 'our'
}
