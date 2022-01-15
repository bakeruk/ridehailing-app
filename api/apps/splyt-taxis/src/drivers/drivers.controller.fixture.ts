export const findAlldriversFixture = {
  valid: {
    required: {
      latitude: 51.5049375,
      longitude: -0.0964509
    },
    optional: {
      latitude: 51.5049375,
      longitude: -0.0964509,
      numberOfVehicles: 10
    }
  },
  invalid: {},
  expect: {
    withoutNumberOfVehicles: {
      pickup_eta: 7,
      drivers: [
        {
          driver_id: "0-s757dr6oat",
          location: {
            latitude: 51.50501232395468,
            longitude: -0.09441355339112988,
            bearing: 112
          }
        },
        {
          driver_id: "1-ocyrv6g3g6",
          location: {
            latitude: 51.50951801950712,
            longitude: -0.10828838776430573,
            bearing: 16
          }
        },
        {
          driver_id: "2-mjnztuebhx",
          location: {
            latitude: 51.501048636966466,
            longitude: -0.11324215673071489,
            bearing: 43
          }
        },
        {
          driver_id: "3-d4o73szvze",
          location: {
            latitude: 51.512489983037945,
            longitude: -0.09503055116387094,
            bearing: 264
          }
        },
        {
          driver_id: "4-r0fghd4g79",
          location: {
            latitude: 51.50056994896655,
            longitude: -0.0858692464202952,
            bearing: 150
          }
        },
        {
          driver_id: "5-7x9s3i52l1e",
          location: {
            latitude: 51.496452763638146,
            longitude: -0.09469568901438417,
            bearing: 46
          }
        },
        {
          driver_id: "6-h5097v48zuf",
          location: {
            latitude: 51.4976477477997,
            longitude: -0.08674276920880293,
            bearing: 323
          }
        },
        {
          driver_id: "7-idbw11hzktb",
          location: {
            latitude: 51.51170439230033,
            longitude: -0.11139473754218301,
            bearing: 138
          }
        },
        {
          driver_id: "8-v5ib4d8plx",
          location: {
            latitude: 51.501945467606404,
            longitude: -0.0877182283976188,
            bearing: 348
          }
        },
        {
          driver_id: "9-t0mfjafiwkn",
          location: {
            latitude: 51.51157051142832,
            longitude: -0.08267422146717046,
            bearing: 346
          }
        }
      ]
    },
    withNumberOfVehicles: {
      pickup_eta: 7,
      drivers: [
        {
          driver_id: "0-s757dr6oat",
          location: {
            latitude: 51.50501232395468,
            longitude: -0.09441355339112988,
            bearing: 112
          }
        },
        {
          driver_id: "1-ocyrv6g3g6",
          location: {
            latitude: 51.50951801950712,
            longitude: -0.10828838776430573,
            bearing: 16
          }
        },
        {
          driver_id: "2-mjnztuebhx",
          location: {
            latitude: 51.501048636966466,
            longitude: -0.11324215673071489,
            bearing: 43
          }
        }
      ]
    }
  }
};