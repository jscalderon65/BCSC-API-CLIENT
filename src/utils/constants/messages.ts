import { credentials } from './credentials';

export const messages = {
  ERROR_MESSAGES: {
    GENERIC_SERVER_ERROR_MESSAGE: 'Internal server error',
  },
  RESPONSE_MESSAGES: {
    NOT_FOUND_BY_ID: (ENTITY_NAME: string, ID: string): string => {
      return `${ENTITY_NAME} with ID ${ID} not found`;
    },
  },
  CONNECTION_MESSAGES: {
    MONGO_CORRECT_CONNECTION:
      'DB successfully connected to ' + credentials.MONGO_DB,
    MONGO_END_CONNECTION: 'DB disconnected',
  },
  ABOUT: {
    API_TITLE: 'BCSC-API-CLIENT',
    API_DESCRIPTION:
      'API REST para gestionar la cuenta bancaria y los datos de un cliente',
    SWAGGER_VERSION: '1.0',
    SWAGGER_ROUTE: 'docs',
  },
};
