import { User } from "../../types";

const mockUsers: User[] = [
  { id: "1", name: "John Snow" },
  { id: "2", name: "Dineries Targaryen" },
  { id: "3", name: "Aria Stark" },
  { id: "4", name: "Jaime Lanister" }
];

export default (req, res) => {
  res.status(200).json(mockUsers);
};
