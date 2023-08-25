/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type EditProfileInput = {
  name?: InputMaybe<Scalars['String']['input']>;
};

export type Hit = {
  __typename?: 'Hit';
  date: Scalars['Date']['output'];
  owner?: Maybe<User>;
};

export type HitQueryInput = {
  endDate?: InputMaybe<Scalars['String']['input']>;
  ownerUid?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  editProfile?: Maybe<Profile>;
  signIn?: Maybe<User>;
  signOut?: Maybe<User>;
  signUp?: Maybe<User>;
  submitHit?: Maybe<Hit>;
};


export type MutationEditProfileArgs = {
  input: EditProfileInput;
};


export type MutationSignInArgs = {
  uid: Scalars['String']['input'];
};


export type MutationSignUpArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  uid: Scalars['String']['input'];
};

export type Profile = {
  __typename?: 'Profile';
  name?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  hits?: Maybe<Array<Maybe<Hit>>>;
  me?: Maybe<User>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryHitsArgs = {
  query?: InputMaybe<HitQueryInput>;
};


export type QueryUserArgs = {
  uid: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  hits: Array<Hit>;
  profile?: Maybe<Profile>;
  uid: Scalars['String']['output'];
};
