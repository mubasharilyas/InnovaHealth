export interface alert {
    errorId: String,
    errorSeverity: String,
    errorCategory: String,
    errorMessage: String,
    longMessage: String,
    errorTime: number,
    selected: Boolean,
    new: Boolean,
    expanded: Boolean
}
export interface alerts {
    alerts: alert[],
    totalCount: number,
    errorMessage?: string
}