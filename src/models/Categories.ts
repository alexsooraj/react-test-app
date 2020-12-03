export interface Category {
    name: string;
    displayName: string;
};

const Categories: Category[] = [{
    displayName: 'Official',
    name: 'OFFICIAL'
}, {
    displayName: 'Home',
    name: 'HOME'
}, {
    displayName: 'Health',
    name: 'HEALTH'
}, {
    displayName: 'Transportation',
    name: 'TRANSPORTATION'
}, {
    displayName: 'Financial',
    name: 'FINANCIAL'
}, {
    displayName: 'Others',
    name: 'OTHERS'
}];

export { Categories };
