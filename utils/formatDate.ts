import dayjs from "dayjs"

function formatDisplayDate(input: string | Date) {
  return dayjs(input).format("MMM DD, YYYY");
}

export { formatDisplayDate }