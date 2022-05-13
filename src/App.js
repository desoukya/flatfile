import React, { useEffect, useState } from 'react';
import FlatfileImporter from '@flatfile/adapter';
import "bootstrap/dist/css/bootstrap.css";
import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button";
import { partial } from 'lodash';
import TEMPLATES from './templates'
import FLAT_FILE_FIELDS from './flatFileFields'
import citiesValidation from './validation/cities';
import ourairportsValidation from './validation/ourairports';

const LICENSE_KEY = '70cbe3fa-b6ba-4943-be91-c2b93060c496';
const webhookUrl = 'https://webhook.site/9d415116-003b-4af6-b648-2d4c4f58db82';

function App() {
  // Declare component state for Batch Id
  const [batchId, setBatchId] = useState();
  const [template, setTemplate] = useState();
  const [importer, setImporter] = useState();
  const [userName, setUserName] = useState();
  const [userJwt, setUserJwt] = useState();

  // Instantiate FlatFileImporter Widget
  useEffect(() => {
    template && userName && userJwt && setImporter(new FlatfileImporter(LICENSE_KEY, {
      type: TEMPLATES[template],
      fields: FLAT_FILE_FIELDS[template]?.fields,
      managed: true,
      webhookUrl,
    }));
  }, [template, userName, userJwt])

  // Determine which validation function to run based on template prop
  const validationFn = ({
    [TEMPLATES.ourairports]: partial(ourairportsValidation),
    [TEMPLATES.cities]: partial(citiesValidation),
  })[template];

  if (importer) {
    // Register the validation function on FlatFileImporter instance
    importer.registerRecordHook(record => validationFn(record));
    // Set the customer data on FlatFileImporter instance (note: this data will be passed back in webhook)
    importer.setCustomer({ name: userName, userId: userJwt })
  }

  // Handler method to launch FlatFileImporter widget
  const launchFlatFile = async () => {
    const userData = await importer.requestDataFromUser();
    importer.displayLoader();
    setTimeout(() => {
      importer.displaySuccess('CSV File Successfully Uploaded!');
      setBatchId(JSON.stringify(userData.batchId, null, 2));
    }, 1500);
  };

  return (
    <div className='App'>
      <Form>
        <Form.Select aria-label="Default select example" onChange={(e) => setTemplate(e.target.value)}>
          <option>Select a template</option>
          <option value="cities">cities</option>
          <option value="ourairports">ourairports</option>
        </Form.Select>

        <Form.Group className="mb-1" controlId="formBasicName">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setUserName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-1" controlId="formBasicJWT">
          <Form.Label>User JWT</Form.Label>
          <Form.Control type="text" placeholder="Enter JWT" onChange={(e) => setUserJwt(e.target.value)} />
        </Form.Group>

        <Button onClick={launchFlatFile} disabled={!template || !userName || !userJwt}>
          Upload CSV
        </Button>

        <Form.Group className="mb-1" controlId="formBasicBatchId">
          <Form.Label>{batchId ? `Batch Id: ${batchId}` : ''}</Form.Label>
        </Form.Group>
      </Form>
    </div>
  );
}

export default App;
