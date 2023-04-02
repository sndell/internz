type NewFormTypes = {
  position: string;
  description: string;
  scope: "full_time" | "part_time";
  start_date: Date;
  end_date: Date;
  city: string;
  location: "on_site" | "remote" | "hybrid";
  tags: string[];
};

type Job = {
  company: CompanyFormTypes;
  user: UserType;
  id: string;
} & NewFormTypes;

type Filters = {
  cities: string[];
  tags: string[];
};

interface FilterSlice {
  locations: string[];
  tags: string[];
  search: string;
  start_date: string | null;
  end_date: string | null;
  start_date_order: FilterDateOrder;
  end_date_order: FilterDateOrder;
}

type FilterDateOrder = "before" | "after" | "on";

type FilterCategory = keyof FilterSlice;

interface JobSlice {
  job: Job | null;
}
