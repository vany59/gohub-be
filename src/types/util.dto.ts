class keyValue {
  key: string;
  value: string;
  operator: string;
}

export class UtilDto {
  filters: keyValue[];
  sort: keyValue[];
}
