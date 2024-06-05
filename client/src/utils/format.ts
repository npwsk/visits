import { Clinic, Contact, User } from "../types";

export const formatUser = ({ lastName, firstName, middleName }: User) => {
  return `${lastName} ${firstName[0]}.${middleName[0]}`;
};

export const formatClinic = ({ name }: Clinic) => {
  return `${name}`;
};

export const formatContact = ({ firstName, lastName, middleName }: Contact) => {
  return `${lastName} ${firstName[0]}.${middleName[0]}`;
};

export const formatDate = (dateTime: string) => {
  return dateTime.split('T')[0].replaceAll('-', '‑');
};