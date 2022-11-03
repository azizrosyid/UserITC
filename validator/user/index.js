const { userCreateSchema, userUpdateSchema, filePhotoSchema } = require("./schema");

function validateUserCreatePayload(payload) {
  const validationResult = userCreateSchema.validate(payload);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
}

function validateUserUpdatePayload(payload) {
  const validationResult = userUpdateSchema.validate(payload);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
}

function validateUserPhotoPayload(payload) {
  const validationResult = filePhotoSchema.validate(payload);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
}

module.exports = {
  validateUserCreatePayload,
  validateUserUpdatePayload,
  validateUserPhotoPayload,
};
