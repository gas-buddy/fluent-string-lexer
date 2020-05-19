export default {
  trim: v => String(v).trim(),
  trimLeft: v => String(v).trimLeft(),
  trimRight: v => String(v).trimRight(),
  removeIfFalsy: v => (v || undefined),
};
