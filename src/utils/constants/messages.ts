export const messages = {
  ERROR_MESSAGES: {
    GENERIC_SERVER_ERROR_MESSAGE: 'Internal server error',
  },
  RESPONSE_MESSAGES: {
    NOT_FOUND_BY_ID: (ENTITY_NAME: string, ID: string): string => {
      return `${ENTITY_NAME} with ID ${ID} not found`;
    },
  },
};
