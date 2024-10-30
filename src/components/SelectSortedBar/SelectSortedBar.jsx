import Select from 'react-select';

const groupBadgeStyles = {
  backgroundColor: '#EBECF0',
  borderRadius: 'none',
  fontSize: '1em',
  padding: '0.2em 0.5em',
};

const customStyles = {
  container: provided => ({
    ...provided,
    width: ' 35vw',
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '1.25em',
    backgroundColor: state.isSelected ? 'rgb(152, 253, 143)' : '#fff',
    color: state.isSelected ? '#fff' : '#000',
    padding: '0.2em 0.5em',
    margin: 0,
  }),
  control: provided => ({
    ...provided,
    minHeight: 40,
    borderRadius: 'none',
  }),
  singleValue: provided => ({
    ...provided,
    color: 'grey',
    fontSize: '1.25em',
  }),
  groupHeading: provided => ({
    ...provided,
    backgroundColor: '#EBECF0',
    borderRadius: 'none',
    fontSize: '1em',
    padding: '0.5em',
    fontWeight: 'bold',
    margin: 0,
  }),
};

const formatGroupLabel = ({ label, options }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 0,
    }}
  >
    <span>{label}</span>
    <span style={groupBadgeStyles}>{options.length}</span>
  </div>
);

export const filterOptions = [
  {
    label: 'Popularity',
    options: [
      { value: 'popularity.desc', label: 'Popular' },
      { value: 'popularity.asc', label: 'Unpopular' },
    ],
  },
  {
    label: 'Date of release',
    options: [
      { value: 'release_date.desc', label: 'New' },
      { value: 'release_date.asc', label: 'Old' },
    ],
  },
  {
    label: 'Rating',
    options: [
      { value: 'vote_average.desc', label: 'High rating' },
      { value: 'vote_average.asc', label: 'Low rating' },
    ],
  },
];

export default function SelectFilterBar({ value, onChange }) {
  return (
    <Select
      defaultValue={value}
      options={filterOptions}
      formatGroupLabel={formatGroupLabel}
      styles={customStyles}
      onChange={onChange}
    />
  );
}
