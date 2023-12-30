import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://lvdkxjgbwrlwvxtnztdw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZGt4amdid3Jsd3Z4dG56dGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3NzM3NTMsImV4cCI6MjAxOTM0OTc1M30.Fd2U3W09Fr4LgMt6Pf-BEqq1s_8FWwjCEKFc5zqyFrU"
);
