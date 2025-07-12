import { Project, TeamMember } from "../types"

export const isManager =(managerId: Project['manager'], UserId: TeamMember['_id'])=>{


    return managerId === UserId
}