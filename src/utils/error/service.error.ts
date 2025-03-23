
class ServiceError extends Error {

    public code: number;

    constructor(messsage: string, code: number) {
        super(messsage);
        this.code = code;
    }

}

export default ServiceError;