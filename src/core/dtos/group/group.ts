export interface AddTeamForm {
  image?: string;
  name: string;
}

export interface AddTeamResponse {
  id: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
