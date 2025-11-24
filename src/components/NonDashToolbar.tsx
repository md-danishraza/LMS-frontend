import React, { Dispatch, SetStateAction } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';


type prop = {
  onSearch: Dispatch<SetStateAction<string>>;
  onCategoryChange: Dispatch<SetStateAction<string>>;
  selectedCategory?: string;
};

// can fetch categories from API later
const categories = [
  'Development',
  'Design',
  'Business',
  'Marketing',
  'Music',
  'IT & Software',
  'Artificial Intelligence',
  'Data Science',
  'Computer Science'
];

function NonDashToolbar({ onSearch, onCategoryChange,selectedCategory }: prop) {
  return (
    <div className="flex  flex-col md:flex-row gap-4 w-full p-4 bg-card border rounded-lg shadow-sm">
      {/* Search Input */}
      <div className="relative w-full lg:min-w-[200px] md:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by title..."
          className="pl-10"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Category Select */}
      <div className="w-full md:w-auto md:min-w-[200px]">
        <Select value={selectedCategory || 'all'} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default NonDashToolbar;