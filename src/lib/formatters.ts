/**
 * Number and Currency Formatters tailored for Bangladeshi Taka (BDT) and Asia/Dhaka Timezone.
 */

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

/**
 * Converts Western Arabic digits (0-9) to Eastern Nagari / Bengali digits (০-৯).
 */
export function toBengaliNumerals(input: string | number): string {
  return String(input).replace(/[0-9]/g, (digit) => BENGALI_DIGITS[parseInt(digit, 10)] ?? digit);
}

export interface BDTFormatOptions {
  locale?: 'en-BD' | 'bn-BD';
  decimals?: number;
  showSymbol?: boolean;
}

/**
 * Formats a monetary value in Bangladeshi Taka (BDT, ৳).
 * Defaults to 'en-BD' formatting with standard two-decimal precision.
 */
export function formatBDT(amount: number, options: BDTFormatOptions = {}): string {
  const { locale = 'en-BD', decimals = 2, showSymbol = true } = options;

  if (isNaN(amount)) {
    return showSymbol ? '৳ 0.00' : '0.00';
  }

  // Use Indian/Bangladeshi numbering system (lakh/crore groupings)
  const formattedNumber = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);

  if (locale === 'bn-BD') {
    const bengaliNumber = toBengaliNumerals(formattedNumber);
    return showSymbol ? `৳ ${bengaliNumber}` : bengaliNumber;
  }

  return showSymbol ? `৳ ${formattedNumber}` : formattedNumber;
}

export interface DateFormatOptions {
  showTime?: boolean;
  timeStyle?: 'short' | 'medium';
  locale?: 'en-GB' | 'bn-BD';
}

/**
 * Formats a date or ISO string in the Asia/Dhaka (UTC+06:00) timezone.
 */
export function formatDhakaDate(dateInput: Date | string, options: DateFormatOptions = {}): string {
  const { showTime = false, timeStyle = 'short', locale = 'en-GB' } = options;
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const intlOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...(showTime && {
      hour: '2-digit',
      minute: '2-digit',
      second: timeStyle === 'medium' ? '2-digit' : undefined,
      hour12: true,
    }),
  };

  return new Intl.DateTimeFormat(locale, intlOptions).format(date);
}

/**
 * Formats a product stock quantity with its unit of measure.
 */
export function formatQuantity(qty: number, unit = 'pcs'): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2,
  }).format(qty);
  return `${formatted} ${unit}`;
}
