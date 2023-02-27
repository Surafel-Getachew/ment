export enum Level {
    Home = 'Home',
    Pathway = 'Pathway',
    Cluster = 'Cluster',
    Competency = 'Competency',
    CompetencyLevel='Competency Level',
    Assessment='Assessment'
}

export interface ITopLevelNav {
    level:Level,
    pathwayId?:string,
    clusterId?:string,
    competencyId?:string,
}
