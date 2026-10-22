// The client's errors carry a numeric id (`error.errorID`), attached where the error is created and
// read as `errorID ?? 0`.

interface Error {
    errorID?: number;
}
