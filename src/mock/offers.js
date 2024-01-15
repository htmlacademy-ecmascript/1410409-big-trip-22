const OFFERS = [
  {
    'type': 'taxi',
    'offers': [
      {
        'id': '5e16ac36-a97e-4bad-ba02-0df89d33ee63',
        'title': 'Upgrade to a business class',
        'price': 96
      },
      {
        'id': 'f465de8a-89df-4e52-8e53-4b40c9c533da',
        'title': 'Choose the radio station',
        'price': 50
      },
      {
        'id': 'cdd8f979-2854-4a1d-a976-fb23d259bdaf',
        'title': 'Choose temperature',
        'price': 44
      },
      {
        'id': '7f8870fa-abd9-46f8-b7ea-0fb3243f85f7',
        'title': 'Drive quickly, I\'m in a hurry',
        'price': 148
      },
      {
        'id': 'e435a663-401a-4bbb-99bd-59f4cd7ef4cf',
        'title': 'Drive slowly',
        'price': 110
      }
    ]
  },
  {
    'type': 'bus',
    'offers': [
      {
        'id': '9ae85f15-e5e1-4752-87b9-cf6cf7228b77',
        'title': 'Infotainment system',
        'price': 46
      },
      {
        'id': '22d8ce54-ed92-4dc4-b8d1-9e3426a38a73',
        'title': 'Order meal',
        'price': 163
      },
      {
        'id': '916a3369-33e2-4408-a2c6-5e25ad892de5',
        'title': 'Choose seats',
        'price': 181
      }
    ]
  },
  {
    'type': 'train',
    'offers': [
      {
        'id': 'b8e0d61d-f25a-455c-9807-5df67112584d',
        'title': 'Book a taxi at the arrival point',
        'price': 33
      },
      {
        'id': '44986122-9b31-4f11-89c5-8ec2ace9811b',
        'title': 'Order a breakfast',
        'price': 108
      },
      {
        'id': '04bf0f57-6c60-4d85-a23c-d743b40648dd',
        'title': 'Wake up at a certain time',
        'price': 66
      }
    ]
  },
  {
    'type': 'flight',
    'offers': [
      {
        'id': '65392b19-6828-435b-b843-6a2b606a4cf1',
        'title': 'Choose meal',
        'price': 173
      },
      {
        'id': 'f98d6727-a394-4f1a-b201-2a5b54190763',
        'title': 'Choose seats',
        'price': 151
      },
      {
        'id': '241ffd36-0492-456e-b0ab-a1b3100ccd1f',
        'title': 'Upgrade to comfort class',
        'price': 32
      },
      {
        'id': '5a760f18-b3a0-448a-acde-16bb7c404669',
        'title': 'Upgrade to business class',
        'price': 177
      },
      {
        'id': 'e4e885f1-366c-4670-be17-a247b70812f3',
        'title': 'Add luggage',
        'price': 47
      },
      {
        'id': '3f7f6923-b5e1-4a90-89fb-2a1e93da597c',
        'title': 'Business lounge',
        'price': 88
      }
    ]
  },
  {
    'type': 'check-in',
    'offers': [
      {
        'id': '4ad88c9f-22a1-435b-bc33-42e88a613586',
        'title': 'Choose the time of check-in',
        'price': 54
      },
      {
        'id': '8507887d-cdcd-4d8c-936f-8bf8f4cf27f0',
        'title': 'Choose the time of check-out',
        'price': 198
      },
      {
        'id': '877ab1a0-ac98-47a3-b860-99e076cb04f5',
        'title': 'Add breakfast',
        'price': 117
      },
      {
        'id': '4e6dc96a-0c72-4740-8335-2770241adf54',
        'title': 'Laundry',
        'price': 105
      },
      {
        'id': 'da63d9ab-2034-47f9-8b5d-30f9467db695',
        'title': 'Order a meal from the restaurant',
        'price': 119
      }
    ]
  },
  {
    'type': 'sightseeing',
    'offers': []
  },
  {
    'type': 'ship',
    'offers': [
      {
        'id': 'b4a80413-6787-4743-bf8b-aaaef3e4cc58',
        'title': 'Choose meal',
        'price': 145
      },
      {
        'id': 'a748ef7d-868c-4419-912d-3c398e25d9ae',
        'title': 'Choose seats',
        'price': 116
      },
      {
        'id': 'c11bcff7-c012-413b-9396-63ebdd8437dc',
        'title': 'Upgrade to comfort class',
        'price': 71
      },
      {
        'id': '7d9e0d3a-75a0-4f41-a999-ce625893ddc3',
        'title': 'Upgrade to business class',
        'price': 182
      },
      {
        'id': '5640da09-80d7-428a-97c8-6be70cdc4e8c',
        'title': 'Add luggage',
        'price': 154
      },
      {
        'id': '9b9dc2fd-8d05-4aad-843a-9ac5292aea29',
        'title': 'Business lounge',
        'price': 187
      }
    ]
  },
  {
    'type': 'drive',
    'offers': [
      {
        'id': 'af9ac5ad-eb0b-4a2e-8da3-a079a2c5827f',
        'title': 'With automatic transmission',
        'price': 186
      },
      {
        'id': '1d87f090-07b4-4253-b7fe-1fdd52505913',
        'title': 'With air conditioning',
        'price': 35
      }
    ]
  },
  {
    'type': 'restaurant',
    'offers': [
      {
        'id': 'def094a3-3045-4f5c-b6a0-8284dc0db4ed',
        'title': 'Choose live music',
        'price': 160
      },
      {
        'id': '49525f91-ae98-492b-8ce7-c99d50082a2a',
        'title': 'Choose VIP area',
        'price': 58
      }
    ]
  }
];

function getMockOffers() {
  return OFFERS;
}

export {getMockOffers};
