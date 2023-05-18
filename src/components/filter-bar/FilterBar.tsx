import { Select } from "@geist-ui/core";

const FilterBar = () => {
  return (
    <>
      Filter:
      <Select placeholder="Filter" multiple>
        <Select.Option label>Name</Select.Option>
        <Select.Option value="1">Fuel</Select.Option>
        <Select.Option value="2">Toolkits</Select.Option>
        <Select.Option value="3">Food</Select.Option>
        <Select.Option value="4">Ammo</Select.Option>
        <Select.Option value="5">Escape Velocity Poster</Select.Option>
        <Select.Option value="6">Escape Velocity Hab Paint</Select.Option>
        <Select.Option value="7">ATLAS</Select.Option>
        <Select.Option label>Rarity</Select.Option>
        <Select.Option value="8">Common</Select.Option>
        <Select.Option value="9">Uncommon</Select.Option>
      </Select>
    </>
  );
};

export default FilterBar;
