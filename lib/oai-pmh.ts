import { XMLParser } from 'fast-xml-parser';

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

export interface LibraryResource {
  id: string;
  title: string;
  authors: string[];
  subjects: string[];
  description: string[];
  date: string;
  type: string;
  format: string[];
  url: string;
  language: string[];
  rights: string[];
  setSpec: string[];
}

const NLSIU_OAI_ENDPOINT = 'https://repository.nls.ac.in/cgi/oai2';

export async function harvestNLSIURepository(
  page: number = 1,
  pageSize: number = 10,
  query: string = '',
  type: string = 'all',
  subject: string = 'all'
): Promise<{
  resources: LibraryResource[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}> {
  try {
    console.log('Initiating OAI-PMH request to NLSIU repository...');
    
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    // Construct the OAI-PMH request URL
    const params = new URLSearchParams({
      verb: 'ListRecords',
      metadataPrefix: 'oai_dc',
      set: 'law', // Filter for law-related documents
    });

    console.log('Requesting URL:', `${NLSIU_OAI_ENDPOINT}?${params}`);

    const response = await fetch(`${NLSIU_OAI_ENDPOINT}?${params}`, {
      headers: {
        'Accept': 'application/xml',
        'User-Agent': 'TheLawHub/1.0'
      }
    });

    if (!response.ok) {
      console.error('OAI-PMH request failed:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new Error(`OAI-PMH request failed: ${response.status} ${response.statusText}`);
    }

    const xmlText = await response.text();
    console.log('Received XML response, length:', xmlText.length);

    if (!xmlText.includes('<?xml')) {
      console.error('Invalid XML response:', xmlText.substring(0, 200));
      throw new Error('Invalid XML response from OAI-PMH endpoint');
    }

    const parsedData = parser.parse(xmlText) as OAIResponse;
    
    if (!parsedData['OAI-PMH']?.ListRecords?.record) {
      console.error('Unexpected response structure:', parsedData);
      throw new Error('Unexpected response structure from OAI-PMH endpoint');
    }

    console.log('Successfully parsed OAI-PMH response, records:', parsedData['OAI-PMH'].ListRecords.record.length);

    // Transform OAI records to our LibraryResource format
    const resources: LibraryResource[] = parsedData['OAI-PMH'].ListRecords.record.map(record => {
      const metadata = record.metadata['oai_dc:dc'];
      return {
        id: record.header.identifier,
        title: metadata['dc:title']?.[0] || 'Untitled',
        authors: metadata['dc:creator'] || [],
        subjects: metadata['dc:subject'] || [],
        description: metadata['dc:description'] || [],
        date: metadata['dc:date']?.[0] || record.header.datestamp,
        type: metadata['dc:type']?.[0] || 'unknown',
        format: metadata['dc:format'] || [],
        url: metadata['dc:identifier']?.find(id => id.startsWith('http')) || '',
        language: metadata['dc:language'] || ['English'],
        rights: metadata['dc:rights'] || [],
        setSpec: record.header.setSpec || [],
      };
    });

    // Apply filters
    let filteredResources = resources;

    if (query) {
      const searchTerms = query.toLowerCase().split(' ');
      filteredResources = filteredResources.filter(resource => {
        const searchableText = [
          resource.title,
          ...resource.authors,
          ...resource.subjects,
          ...resource.description,
        ].join(' ').toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    if (type !== 'all') {
      filteredResources = filteredResources.filter(resource => 
        resource.type.toLowerCase() === type.toLowerCase()
      );
    }

    if (subject !== 'all') {
      filteredResources = filteredResources.filter(resource => 
        resource.subjects.some(s => s.toLowerCase().includes(subject.toLowerCase()))
      );
    }

    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedResources = filteredResources.slice(startIndex, endIndex);

    // Check if there are more records
    const resumptionToken = parsedData['OAI-PMH'].ListRecords.resumptionToken;
    const hasMore = !!resumptionToken;

    console.log('Returning filtered and paginated resources:', {
      total: filteredResources.length,
      page,
      pageSize,
      hasMore
    });

    return {
      resources: paginatedResources,
      total: filteredResources.length,
      page,
      pageSize,
      hasMore,
    };
  } catch (error: any) {
    console.error('Error in harvestNLSIURepository:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      cause: error?.cause
    });
    throw error;
  }
} 