import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

const initialState = {
  alert: [],
  auth: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNmOTI0YjM3NzE4MjEzZWIyZWFmNWY1In0sImlhdCI6MTY4NjY4MDM2NSwiZXhwIjoxNjg3MDQwMzY1fQ.m33Mi2QZooMwMwuRUUP_KlUJj9rfBuMreOiw5oSx1gI',
    isAuthenticated: true,
    loading: false,
    user: {
      _id: '63f924b37718213eb2eaf5f5',
      name: 'David',
      surname: 'Parras Martinez',
      email: 'dparrasmartinez@gmail.com',
      password: '$2a$10$yz7nz4fgq7WWnmUaj.CaJegVJKC/OLugfwCss5K0XnlAdrugZ.Ycu',
      avatar: '',
      __v: 0
    },
    error: null
  },
  document: {
    inbox: [
      {
        _id: '64889fc0cc4a39bba4ca6fe4',
        lastChange: '2023-06-13T16:56:32.057Z',
        title: 'L1J5P.pdf',
        recipients: [
          {
            _id: '64889fc0cc4a39bba4ca6fe6',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: true,
            viewed: true,
            folder: 'INBOX'
          },
          {
            _id: '64889fc0cc4a39bba4ca6fe7',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      },
      {
        _id: '64889fc0cc4a39bba4ca6fe9',
        lastChange: '2023-06-13T16:56:32.057Z',
        title: 'VisaCertifie-V10847965362.pdf',
        recipients: [
          {
            _id: '64889fc0cc4a39bba4ca6feb',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: false,
            viewed: false,
            folder: 'INBOX'
          },
          {
            _id: '64889fc0cc4a39bba4ca6fec',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      },
      {
        _id: '64889fc0cc4a39bba4ca6fee',
        lastChange: '2023-06-13T16:56:32.057Z',
        title: 'Avril (1)-1.pdf',
        recipients: [
          {
            _id: '64889fc0cc4a39bba4ca6ff0',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: true,
            viewed: true,
            folder: 'INBOX'
          },
          {
            _id: '64889fc0cc4a39bba4ca6ff1',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: true,
        __v: 0,
        isChecked: false
      },
      {
        _id: '6488a4dfcc4a39bba4ca7004',
        lastChange: '2023-06-13T17:18:22.922Z',
        title: 'Avis_d_impot_2022_sur_les_revenus_2021 (1).pdf',
        recipients: [
          {
            _id: '6488a4dfcc4a39bba4ca7006',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: false,
            viewed: false,
            folder: 'INBOX'
          },
          {
            _id: '6488a4dfcc4a39bba4ca7007',
            name: 'TEST',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      },
      {
        _id: '6488ca9ecc4a39bba4ca705d',
        lastChange: '2023-06-13T19:59:26.889Z',
        title: 'Alsa.pdf',
        recipients: [
          {
            _id: '6488ca9ecc4a39bba4ca705f',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          },
          {
            _id: '6488ca9ecc4a39bba4ca7060',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: true,
            needsToView: true,
            signed: false,
            viewed: false,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0
      }
    ],
    sent: [
      {
        _id: '6488ca9ecc4a39bba4ca705d',
        lastChange: '2023-06-13T19:59:26.889Z',
        title: 'Alsa.pdf',
        recipients: [
          {
            _id: '6488ca9ecc4a39bba4ca705f',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          },
          {
            _id: '6488ca9ecc4a39bba4ca7060',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: true,
            needsToView: true,
            signed: false,
            viewed: false,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0
      }
    ],
    selectedDocuments: [],
    documentsLoaded: [],
    readingDocument: {},
    uploadedDocuments: [],
    searchedDocuments: [
      {
        _id: '64889fc0cc4a39bba4ca6fe4',
        lastChange: '2023-06-13T16:56:32.057Z',
        title: 'L1J5P.pdf',
        recipients: [
          {
            _id: '64889fc0cc4a39bba4ca6fe6',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: true,
            viewed: true,
            folder: 'INBOX'
          },
          {
            _id: '64889fc0cc4a39bba4ca6fe7',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      },
      {
        _id: '64889fc0cc4a39bba4ca6fe9',
        lastChange: '2023-06-13T16:56:32.057Z',
        title: 'VisaCertifie-V10847965362.pdf',
        recipients: [
          {
            _id: '64889fc0cc4a39bba4ca6feb',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: false,
            viewed: false,
            folder: 'INBOX'
          },
          {
            _id: '64889fc0cc4a39bba4ca6fec',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      },
      {
        _id: '64889fc0cc4a39bba4ca6fee',
        lastChange: '2023-06-13T16:56:32.057Z',
        title: 'Avril (1)-1.pdf',
        recipients: [
          {
            _id: '64889fc0cc4a39bba4ca6ff0',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: true,
            viewed: true,
            folder: 'INBOX'
          },
          {
            _id: '64889fc0cc4a39bba4ca6ff1',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: true,
        __v: 0,
        isChecked: false
      },
      {
        _id: '6488a4dfcc4a39bba4ca7009',
        lastChange: '2023-06-13T17:18:22.922Z',
        title:
          'Avis_de_situation_declarative_a_l_impot_2023_sur_les_revenus_2022_le_14_04 (2).pdf',
        recipients: [
          {
            _id: '6488a4dfcc4a39bba4ca700b',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: true,
            viewed: true,
            folder: 'INBOX'
          },
          {
            _id: '6488a4dfcc4a39bba4ca700c',
            name: 'TEST',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      },
      {
        _id: '6488a4dfcc4a39bba4ca7004',
        lastChange: '2023-06-13T17:18:22.922Z',
        title: 'Avis_d_impot_2022_sur_les_revenus_2021 (1).pdf',
        recipients: [
          {
            _id: '6488a4dfcc4a39bba4ca7006',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: false,
            viewed: false,
            folder: 'INBOX'
          },
          {
            _id: '6488a4dfcc4a39bba4ca7007',
            name: 'TEST',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      },
      {
        _id: '6488a4dfcc4a39bba4ca6fff',
        lastChange: '2023-06-13T17:18:22.922Z',
        title: 'avanza-billete-18952.pdf',
        recipients: [
          {
            _id: '6488a4dfcc4a39bba4ca7001',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: false,
            viewed: false,
            folder: 'INBOX'
          },
          {
            _id: '6488a4dfcc4a39bba4ca7002',
            name: 'TEST',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      },
      {
        _id: '6488b0c5cc4a39bba4ca7038',
        lastChange: '2023-06-13T18:09:09.757Z',
        title: 'Billete iberia 2.pdf',
        recipients: [
          {
            _id: '6488b0c5cc4a39bba4ca703a',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: true,
            viewed: true,
            folder: 'INBOX'
          },
          {
            _id: '6488b0c5cc4a39bba4ca703b',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      },
      {
        _id: '6488b0c5cc4a39bba4ca703d',
        lastChange: '2023-06-13T18:09:09.757Z',
        title: 'Entrada 2.pdf',
        recipients: [
          {
            _id: '6488b0c5cc4a39bba4ca703f',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: true,
            needsToView: true,
            signed: true,
            viewed: true,
            folder: 'INBOX'
          },
          {
            _id: '6488b0c5cc4a39bba4ca7040',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true,
            folder: 'INBOX'
          }
        ],
        signed: false,
        viewed: false,
        __v: 0,
        isChecked: false
      }
    ]
  },
  envelope: {
    documents: [
      {
        _id: '6488ca9ecc4a39bba4ca705d',
        lastChange: '2023-06-13T19:59:26.889Z',
        title: 'Alsa.pdf',
        recipients: [
          {
            _id: '6488ca9ecc4a39bba4ca705f',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: false,
            folder: 'INBOX'
          },
          {
            _id: '6488ca9ecc4a39bba4ca7060',
            name: 'Test',
            email: 'david@parras.com',
            needsToSign: true,
            needsToView: true,
            signed: false,
            viewed: false,
            folder: 'INBOX'
          },
          {
            _id: '6488ca9ecc4a39bba4ca7061',
            name: 'David Parras Martinez',
            email: 'dparrasmartinez@gmail.com',
            isAuthor: true,
            folder: 'SENT',
            needsToSign: false,
            needsToView: true,
            signed: false,
            viewed: true
          }
        ],
        signed: false,
        viewed: false,
        __v: 0
      }
    ],
    recipients: [
      {
        _id: '6488ca9ecc4a39bba4ca705f',
        name: 'David Parras Martinez',
        email: 'dparrasmartinez@gmail.com',
        needsToSign: false,
        needsToView: true,
        signed: false,
        viewed: false,
        folder: 'INBOX'
      },
      {
        _id: '6488ca9ecc4a39bba4ca7060',
        name: 'Test',
        email: 'david@parras.com',
        needsToSign: true,
        needsToView: true,
        signed: false,
        viewed: false,
        folder: 'INBOX'
      },
      {
        _id: '6488ca9ecc4a39bba4ca7061',
        name: 'David Parras Martinez',
        email: 'dparrasmartinez@gmail.com',
        isAuthor: true,
        folder: 'SENT',
        needsToSign: false,
        needsToView: true,
        signed: false,
        viewed: true
      }
    ],
    mail: 'dparrasmartinez@gmail.com'
  }
}

const mockReduxStore = mockStore(initialState)

export default mockReduxStore
