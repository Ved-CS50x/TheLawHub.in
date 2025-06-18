import { XMLParser } from 'fast-xml-parser';

const NLSIU_OAI_ENDPOINT = 'https://repository.nls.ac.in/cgi/oai2';

interface OAIRecord {
  header: {
    identifier: string;
    datestamp: string;
    setSpec: string[];
  };
  metadata: {
    'oai_dc:dc': {
      'dc:title': string[];
      'dc:creator': string[];
      'dc:subject': string[];
      'dc:description': string[];
      'dc:date': string[];
      'dc:type': string[];
      'dc:format': string[];
      'dc:identifier': string[];
      'dc:language': string[];
      'dc:rights': string[];
    };
  };
}

interface OAIResponse {
  'OAI-PMH': {
    responseDate: string;
    request: {
      verb: string;
      metadataPrefix: string;
      set?: string;
      from?: string;
      until?: string;
      resumptionToken?: string;
    };
    ListRecords: {
      record: OAIRecord[];
      resumptionToken?: {
        _text: string;
        completeListSize: string;
        cursor: string;
      };
    };
  };
}

async function harvestAndStore() {
  try {
    console.log('Starting NLSIU repository harvest...');
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    let resumptionToken: string | undefined;
    let totalProcessed = 0;
    let totalStored = 0;

    do {
      // Construct the OAI-PMH request URL
      const params = new URLSearchParams({
        verb: 'ListRecords',
        metadataPrefix: 'oai_dc',
        // set: 'law', // Removed to avoid 404
      });

      if (resumptionToken) {
        params.set('resumptionToken', resumptionToken);
      }

      console.log(`Fetching records${resumptionToken ? ' with resumption token' : ''}...`);
      
      const response = await fetch(`${NLSIU_OAI_ENDPOINT}?${params}`, {
        headers: {
          'Accept': 'application/xml',
          'User-Agent': 'TheLawHub/1.0'
        }
      });

      if (!response.ok) {
        throw new Error(`OAI-PMH request failed: ${response.status} ${response.statusText}`);
      }

      const xmlText = await response.text();
      const parsedData = parser.parse(xmlText) as OAIResponse;
      
      if (!parsedData['OAI-PMH']?.ListRecords?.record) {
        throw new Error('Unexpected response structure from OAI-PMH endpoint');
      }

      const records = parsedData['OAI-PMH'].ListRecords.record;
      console.log(`Processing ${records.length} records...`);

      // Process records in batches
      for (const record of records) {
        try {
          const metadata = record.metadata['oai_dc:dc'];
          
          // Transform and store the record
          // await prisma.libraryResource.upsert({
          //   where: { oaiId: record.header.identifier },
          //   create: {
          //     oaiId: record.header.identifier,
          //     title: metadata['dc:title']?.[0] || 'Untitled',
          //     authors: metadata['dc:creator'] || [],
          //     subjects: metadata['dc:subject'] || [],
          //     description: metadata['dc:description']?.[0] || null,
          //     date: new Date(metadata['dc:date']?.[0] || record.header.datestamp),
          //     type: metadata['dc:type']?.[0] || 'unknown',
          //     format: metadata['dc:format'] || [],
          //     url: metadata['dc:identifier']?.find(id => id.startsWith('http')) || null,
          //     language: metadata['dc:language'] || ['English'],
          //     rights: metadata['dc:rights'] || [],
          //     setSpec: record.header.setSpec || [],
          //   },
          //   update: {
          //     title: metadata['dc:title']?.[0] || 'Untitled',
          //     authors: metadata['dc:creator'] || [],
          //     subjects: metadata['dc:subject'] || [],
          //     description: metadata['dc:description']?.[0] || null,
          //     date: new Date(metadata['dc:date']?.[0] || record.header.datestamp),
          //     type: metadata['dc:type']?.[0] || 'unknown',
          //     format: metadata['dc:format'] || [],
          //     url: metadata['dc:identifier']?.find(id => id.startsWith('http')) || null,
          //     language: metadata['dc:language'] || ['English'],
          //     rights: metadata['dc:rights'] || [],
          //     setSpec: record.header.setSpec || [],
          //   },
          // });
          
          totalStored++;
        } catch (error) {
          console.error(`Error processing record ${record.header.identifier}:`, error);
        }
      }

      totalProcessed += records.length;
      resumptionToken = parsedData['OAI-PMH'].ListRecords.resumptionToken?._text;
      
      console.log(`Progress: ${totalProcessed} records processed, ${totalStored} stored successfully`);
      
      // Add a small delay to be nice to the server
      if (resumptionToken) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } while (resumptionToken);

    console.log('Harvest completed successfully!');
    console.log(`Total records processed: ${totalProcessed}`);
    console.log(`Total records stored: ${totalStored}`);

  } catch (error) {
    console.error('Error during harvest:', error);
    throw error;
  }
}

// Run the harvest
harvestAndStore().catch(console.error); 