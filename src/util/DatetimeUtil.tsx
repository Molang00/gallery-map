import moment from 'moment';

const DEFAULT_DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const formatDate = (date: Date, format: string): string =>
  moment(date).format(format);

export const isValidDate = (
  date: Date,
  format: string,
  isStrict: boolean,
): boolean => {
  const strict =
    isStrict == undefined || isStrict == null || isStrict === undefined
      ? false
      : isStrict;
  return moment(date, format, strict).isValid();
};

export const datetimeStrToDate = (
  datetimeStr: string,
  format: string,
): Date => {
  let f = format;
  if (f == undefined || f == null || f === '') {
    f = DEFAULT_DATETIME_FORMAT;
  }

  return moment(datetimeStr, f).toDate();
};
