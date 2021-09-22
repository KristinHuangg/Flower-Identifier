import FileUpload from '../../components/FileUpload';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

it('FileUpload renders correctly', () => {
  const imageURL = null;
  const setImageURL = jest.fn();
  const model = null;
  const results = [];
  const setResults = jest.fn();

  const tree = renderer
    .create(<FileUpload imageURL={imageURL} setImageURL={setImageURL} model={model}
      results={results} setResults={setResults}></FileUpload>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});