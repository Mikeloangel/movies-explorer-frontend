/**
 * Returns value from object by path e.g. (obj, 'a.b.c') returns obj.a.b.c value
 * @param {Object} object
 * @param {String} path
 * @returns value from object
 */
export function getObjectPropertyByPath(object, path) {
  if (!path) {
    return undefined;
  }

  const pathSteps = path.split('.');
  let resultValue = object;

  for (let currentStep of pathSteps) {
    if (resultValue[currentStep]) {
      resultValue = resultValue[currentStep];
    } else {
      return undefined;
    }
  }

  return resultValue;
}