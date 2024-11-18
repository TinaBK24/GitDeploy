export interface ICharacter {
    info:    Info;
    results: IChacterResult[];
}

export interface Info {
    count: number;
    pages: number;
    next:  string;
    prev:  null;
}

export interface IChacterResult {
    id?:       number;
    name:     string;
    status?:   string;
    species?:  string;
    type?:     string;
    gender?:   Gender;
    origin?:   Origin;
    location?: Location;
    image?:    string;
    episode?:  string[];
    url?:      string;
    created?:  Date;
}

export interface Location {
    name: string;
    url:  string;
}

export enum Gender {
    Female = "Female",
    Male = "Male",
    Unknown = "Unknown"
}

export interface Origin {
    name: Name;
    url: string;
}

export enum Name {
    Abadango = "Abadango",
    EarthC137 = "Earth (C-137)",
    EarthReplacementDimension = "Earth (Replacement Dimension)",
    Unknown = "unknown",
}

export enum Species {
    Alien = "Alien",
    Human = "Human",
}

export enum Status {
    Alive = "Alive",
    Dead = "Dead",
    Unknown = "unknown",
}