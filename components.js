/**
 * Table KEY-VALUE, with specific format (percentage or number)
 */
Vue.component('key-value-table', {
    props: {
        obj: Object,
        isPercentage: {
            type: Boolean,
            default: false
        }
    },
    template:
        `
            <table class="table table-striped table-sm">
                <thead class="thead-dark">
                <tr>
                    <th class="pl-lg-5" scope="col">Descrizione</th>
                    <th class="text-right pr-lg-5" scope="col">Dato</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="[key, value] in Object.entries(obj)">
                    <th class="pl-lg-5" scope="col">{{ key | formatString }}</th>
                    <td v-if="isPercentage" class="text-right pr-lg-5">{{ value | formatPercentage }}</td>
                    <td v-else class="text-right pr-lg-5">{{ value | formatNumber }}</td>
                </tr>
                </tbody>
            </table>
        `,
    filters: {formatString, formatPercentage, formatNumber},
});

/**
 * Component to display data (plot + table)
 */
Vue.component('andamento', {
    props: {
        content1Id: String,
        content1Obj: Object,
        content2Id: String,
        content2Obj: Object
    },
    template:
        `
            <div class="row px-lg-5">
                <div class="col-lg">
                    <div v-bind:id="content1Id"></div>
                    <div class="pr-lg-2 px-4" v-if="content1Obj!==null">
                        <h4 class="pl-lg-5 py-2">Dati giornalieri</h4>
                        <key-value-table v-bind:obj="content1Obj"></key-value-table>
                    </div>
                </div>
                <div class="col-lg">
                    <div v-bind:id="content2Id"></div>
                    <div class="pl-lg-2 px-4" v-if="content2Obj!==null">
                        <h4 class="pl-lg-5 py-2">Percentuali</h4>
                        <key-value-table v-bind:is-percentage="true"
                                         v-bind:obj="content2Obj"></key-value-table>
                    </div>
                </div>
            </div>
        `
});