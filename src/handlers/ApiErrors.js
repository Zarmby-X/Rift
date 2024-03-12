export default function ErrorHandler(error) {
  switch (error.code) {
    case "P2002":
      return {
        code: error.code,
        error: `value duplicated in model {${error.meta.modelName}}`,
        meta: error.meta,
        statusCode: 409,
      };
    default:
      return {
        error: `unrecognized values at the request`,
        statusCode: 409,
      };
  }
}
