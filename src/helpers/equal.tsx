export const isEqual = (objA: any, objB: any) => {
    return (
        JSON.stringify(objA) === JSON.stringify(objB)
    );
}