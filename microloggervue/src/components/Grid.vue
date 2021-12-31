<template>
    <div id="demo">
      <form id="search">
        Search <input name="query" v-model="searchQuery" />
      </form>
      <div id="grid-template">
        <table>
        <thead>
            <th v-bind:key="key" v-for="key in columns"
              @click="sortBy(key)"
              :class="{ active: sortKey == key }">
              {{ key }}
              <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
              </span>
            </th>
        </thead>
        <tbody>
          <tr v-bind:key="entry.name" v-for="entry in filteredDatalogs">
            <td v-bind:key="key" v-for="key in columns">
              {{entry[key]}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
</template>

<script>
export default {
    name: "Grid",
    props: {
          datalogs: Array,
          columns: Array,
          filterKey: String
        },
        data: function() {
          var sortOrders = {};
          this.columns.forEach(function(key) {
            sortOrders[key] = 1;
          });
          console.log(this.columns)
          return {
            sortKey: "",
            sortOrders: sortOrders
          };
        },
        computed: {
          filteredDatalogs: function() {
            var sortKey = this.sortKey;
            var filterKey = this.filterKey && this.filterKey.toLowerCase();
            var order = this.sortOrders[sortKey] || 1;
            var datalogs = this.datalogs;
            if (filterKey) {
              datalogs = datalogs.filter(function(row) {
                return Object.keys(row).some(function(key) {
                  return (
                    String(row[key])
                      .toLowerCase()
                      .indexOf(filterKey) > -1
                  );
                });
              });
            }
            if (sortKey) {
              datalogs = datalogs.slice().sort(function(a, b) {
                a = a[sortKey];
                b = b[sortKey];
                return (a === b ? 0 : a > b ? 1 : -1) * order;
              });
            }
            return datalogs;
          }
        },
        methods: {
          sortBy: function(key) {
            this.sortKey = key;
            this.sortOrders[key] = this.sortOrders[key] * -1;
          }
        }
}
    </script>

    <style scoped>
tbody {
  font-family: Montserrat;
  font-size: 14px;
  color: #000;
}

table {
  border: 2px solid #00BDF0;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #00BDF0;
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #fff;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #fff;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #fff;
}

</style>