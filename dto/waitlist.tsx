type wait_list = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: Date | null;
  updated_at: Date | null;
};

export type AddToWaitlistResponse = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  count: Date | null;
};

export class CreateWaitlistDto {
  firstName: string;
  lastName: string;
  email: string;
}
export class GetAllWaitlist {
  length: number;
  list: wait_list[];
}
