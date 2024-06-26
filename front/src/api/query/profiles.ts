import { Profile, ProfileWithUser } from '@/types/profile';
import { gql, TypedDocumentNode } from '@apollo/client';

export type ProfileWithUserRes = Pick<
  ProfileWithUser,
  | 'firstName'
  | 'lastName'
  | 'avatar'
  | 'age'
  | 'userId'
  | 'email'
  | 'role'
  | 'status'
>;

export const GET_PROFILES: TypedDocumentNode<{
  profiles: ProfileWithUserRes[];
}> = gql`
  query {
    profiles {
      userId
      firstName
      lastName
      avatar
      age
      email
      role
      status
    }
  }
`;

export type ProfileAllWithUserRes = Pick<
  ProfileWithUser,
  'firstName' | 'lastName' | 'userId' | 'email'
>;

export const GET_ALL_PROFILES: TypedDocumentNode<{
  profiles: ProfileAllWithUserRes[];
}> = gql`
  query {
    profiles {
      userId
      firstName
      lastName
      email
    }
  }
`;
