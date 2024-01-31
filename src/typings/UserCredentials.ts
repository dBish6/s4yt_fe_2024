export default interface UserCredentials {
  city_id: number | null;
  country_id: number;
  education_id: number;
  email: string;
  grade_id: number;
  instagram_handle: string | null;
  name: string;
  quiz_submitted: number;
  referral_link: string;
  region_id: number | null;
  roles: Array<string>;
  school: string | null;
}
