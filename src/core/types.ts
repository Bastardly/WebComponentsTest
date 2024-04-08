export interface IError {
	filePath: string;
	errorMsg: string;
	expected?: unknown;
	got?: unknown;
}
