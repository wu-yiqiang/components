import mitt from 'mitt';

export const UPDATE_CASE_INCIDENT_COUNT_NUM = 'UPDATE_CASE_INCIDENT_COUNT_NUM';
export const GET_CASE_BADGE = 'GET_CASE_BADGE';

type Events = {
    UPDATE_CASE_INCIDENT_COUNT_NUM: any;
    GET_CASE_BADGE: any;
};

export const emitter = mitt<Events>(); // inferred as Emitter<Events>
