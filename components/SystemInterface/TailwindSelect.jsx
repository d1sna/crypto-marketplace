// TODO: make it abstract

export const TailwindSelect = ({
  onChange = () => {},
  values,
  selected,
  label,
}) => {
  return (
    <div className="w-full p-2 rounded-lg">
      <label
        for="countries"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        onChange={onChange}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {values.map((value, index) => (
          <option
            selected={(selected && selected === value) || index === 0}
            value={index}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
