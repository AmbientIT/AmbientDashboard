export const NOTE_PER_PAGE = 3

export const mUiTableProps = {
  tableProps: {
    selectable: true,
    multiSelectable: true,
  },
  headerProps: {
    displaySelectAll: true,
    adjustForCheckbox: false,
  },
  bodyProps: {
    showRowHover: true,
    stripedRows: true,
    displayRowCheckbox: true,
    deselectOnClickaway: false,
  },
}
