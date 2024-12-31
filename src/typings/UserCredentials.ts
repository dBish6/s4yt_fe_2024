export default interface UserCredentials {
  id: string;
  // city_id: number | null;
  city: number | null;
  // country_id: number;
  country: number;
  // education_id: number;
  education: number;
  email: string;
  // grade_id: number;
  instagram_handle: string | null;
  name: string;
  quiz_submitted: number;
  referral_link: string;
  // region_id: number | null;
  region: number | null;
  roles: Array<string>;
  school: string | null;
}
