'use strict';

(function() {

function ListingService($location, $cookies, $q, $resource, $http, Auth, User, $filter) {

  var Listing = {


    /**
     * Get current user
     *
     * @return {String}
     */
    getCurrentUser() {
      return Auth.getCurrentUser(null)
      .then(user => {
        if(Object.keys(user).length === 0 && JSON.stringify(user) === JSON.stringify({})) {
          return false;
        }

        if(!user.borrower.listings[0]) {
          var currentUser = User.get();
          var value = (currentUser.hasOwnProperty('$promise')) ?
            currentUser.$promise : currentUser;
          return $q.when(value)
            .then(user => {
              return user;
            }, () => {
              return {};
            });
        } else {
          return user;
        }
      });
    },



    /**
     * Get users
     *
     * @return {String}
     */
    getUser(userID) {
      return $http.get('/api/users/' + userID)
      .then(response => {
        return response.data;
      });
    },



    /**
     * Get users
     *
     * @return {String}
     */
    getUsers(role) {
      if(role) {
        return $http.get('/api/users/role/' + role);
      } else {
        return $http.get('/api/users');
      }
    },



    /**
     * Get listing status
     *
     * @return {String}
     */
    getStatus() {
      return 'in-progress';
    },


    /**
     * Get all listings
     *
     * @return {String}
     */
    getAll(status) {
      if(status) {
        return $http.get('/api/listings/status/' + status);
      } else {
        return $http.get('/api/listings');
      }
    },



    /**
     * Get listing
     *
     * @return {String}
     */
    getOne(listingID) {

      if(listingID) {
        return $http.get('/api/listings/' + listingID);
      } else {
        return Listing.getCurrentUser()
          .then(user => {
            var listingID = user.borrower.listings[0];
            if(listingID) {
              return $http.get('/api/listings/' + listingID);
            } else {
              return {};
            }
          });
      }
    },



    /**
     * Get user from listing
     *
     * @return {String}
     */
    getUserOne(listingID) {
      return $http.get('/api/listings/user/' + listingID)
      .then(response => {
        if(response.data) {
          return response.data;
        } else {
          return false;
        }
      })
      .catch(err => {
        return false;
      });
    },



    /**
     * Create listing
     *
     * @return {String}
     */
    createOne(listing) {
      return Auth.getCurrentUser(null)
        .then(user => {
          return $http.post('/api/listings', {
            user: user,
            listing: listing
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },



    /**
     * Save listing
     *
     * @return {String}
     */
    saveOne(listing) {
      return $http.put('/api/listings/' + listing._id, listing)
      .then(response => {
        if(response.status === 200) {
          return response.data;
        } else {
          return false;
        }
      })
    },



    /**
     * Submit listing
     *
     * @return {String}
     */
    submitOne(listingID) {
      return Listing.getOne(listingID)
        .then(listing => {
          var listing = listing.data;
          var date = new Date;
          listing.admin.basics.submitted = date.toISOString();
          listing.admin.basics.status = 'review';
          return $http.put('/api/listings/' + listingID, listing);
        });
    },



    /**
     * Approve listing
     *
     * @return {String}
     */
    approveOne(listingID) {
      return Listing.getOne(listingID)
        .then(listing => {
          listing.data.admin.basics.status = 'approved';
          return $http.put('/api/listings/' + listingID, listing);
        });
    },



    /**
     * Publish listing
     *
     * @return {String}
     */
    publishOne(listing) {
      return $http.put('/api/listings/' + listing._id, listing);
    },



    /**
     * Delete listing
     *
     * @return {String}
     */
    deleteOne(listingID) {
      return $http.delete('/api/listings/' + listingID);
    },



    /**
     * Add a new comment
     *
     * @return {String}
     */
    addComment(comment, listing, user) {
      return $http.put('/api/listings/comment/' + listing._id, {
        user: user,
        comment: comment,
        listing: listing
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err;
      });
    },



    /**
     * Delete a comment
     *
     * @return {String}
     */
    deleteComment(comment, listing) {
      return $http.post('/api/listings/comment/' + listing._id, {
        comment: comment
      });
    },




    /**
     * Add a new comment reply
     *
     * @return {String}
     */
    addReply(listing, comment, reply) {
      return $http.put('/api/listings/reply/' + listing._id, {
        user: reply.user,
        comment: comment,
        reply: reply
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.message;
      });
    },



    /**
     * Delete a comment reply
     *
     * @return {String}
     */
    deleteReply(comment, reply, listing) {
      return $http.post('/api/listings/reply/' + listing._id, {
        comment: comment,
        reply: reply
      });
    },



    /**
     * Request more details on a listing
     *
     * @return {String}
     */
    requestMore(listing) {
      return Listing.getCurrentUser()
        .then(user => {
          return $http.put('/api/listings/request-more/' + listing._id, {
            user: user
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },



    /**
     * Add a listing to your bookmarks
     *
     * @return {String}
     */
    addBookmark(listing) {
      return Listing.getCurrentUser()
        .then(user => {
          return $http.put('/api/listings/bookmark/' + listing._id, {
            user: user
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },



    /**
     * Remove a listing from your bookmarks
     *
     * @return {String}
     */
    removeBookmark(listing) {
      return Listing.getCurrentUser()
        .then(user => {
          return $http.post('/api/listings/bookmark/' + user._id, {
            listing: listing
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },



    /**
     * Add a listing to your bookmarks
     *
     * @return {String}
     */
    saveMarketplaceFilters(filters) {
      return Listing.getCurrentUser()
        .then(user => {
          user.filters.marketplace = filters;
          return $http.put('/api/users/' + user._id, {
            user: user
          });
        })
        .catch(err => {
          console.log(err.message);
        });
    },



    /**
     * Calculate an investment based on the provided paramters
     *
     * @return {String}
     */
    calcInvestment(amount, term, rate) {

      var effectiveRate = Math.pow(( 1 + ( rate/12 ) ), term);

    },




    /**
     * Get listing distance options
     *
     * @return {String}
     */
    getDistance() {
      return [
        {label: 'Distance (All)'},
        {label: 'Within 5 Miles', value: 5},
        {label: 'Within 10 Miles', value: 10},
        {label: 'Within 20 Miles', value: 20},
        {label: 'Within 50 Miles', value: 50},
        {label: 'Within 100 Miles', value: 100}
      ];
    },




    /**
     * Get listing minimum options
     *
     * @return {String}
     */
    getMinimum() {
      return [
        {label: 'Minimum Amount (All)', value: 0},
        {label: '$500', value: 500},
        {label: '$1,000', value: 1000},
        {label: '$5,000', value: 5000},
        {label: '$10,000', value: 10000},
        {label: '$50,000', value: 50000}
      ];
    },




    /**
     * Get listing rates options
     *
     * @return {String}
     */
    getRates(placeholder) {
      var none = 'Interest Rate (All)';

      if(placeholder) {
        none = placeholder;
      }

      return [
        {label: none, value: 0},
        {label: '6%', value: 6},
        {label: '7%', value: 7},
        {label: '8%', value: 8},
        {label: '9%', value: 9},
        {label: '10%', value: 10},
        {label: '11%', value: 11},
        {label: '12%', value: 12},
        {label: '13%', value: 13},
        {label: '14%', value: 14},
        {label: '15%', value: 15},
        {label: '16%', value: 16},
        {label: '17%', value: 17},
        {label: '18%', value: 18},
        {label: '19%', value: 19},
        {label: '20%', value: 20},
        {label: '21%', value: 21},
        {label: '22%', value: 22},
        {label: '23%', value: 23},
        {label: '24%', value: 24},
        {label: '25%', value: 25}
      ];
    },



    /**
     * Get listing rates options
     *
     * @return {String}
     */
    getFilterRates(placeholder) {
      var none = 'Interest Rate (All)';

      if(placeholder) {
        none = placeholder;
      }

      return [
        {label: none, value: 0},
        {label: '10%+', value: 10},
        {label: '15%+', value: 15},
        {label: '20%+', value: 20},
        {label: '25%+', value: 25}
      ];
    },




    /**
     * Get listing terms options
     *
     * @return {String}
     */
    getTerms(placeholder) {
      var none = 'Term (All)';

      if(placeholder) {
        none = placeholder;
      }

      return [
        {label: none, value: 0},
        {label: '6 Months', value: 6},
        {label: '12 Months', value: 12},
        {label: '18 Months', value: 18},
        {label: '24 Months', value: 24},
        {label: '36 Months', value: 36},
        {label: '48 Months', value: 48},
        {label: '60 Months', value: 60}
      ];
    },

/**
     * Get listing  of year, month, purpose , property types on loan types pages
     *
     * @return {String}
     */
    getRepayMonths(placeholder) {
      var none = 'Term (All)';

      if(placeholder) {
        none = placeholder;
      }

      return [
        {label: none, value: 0},
        {label: '6 Months', value: 6},
        {label: '7 Months', value: 7},
        {label: '8 Months', value: 8},
        {label: '9 Months', value: 9},
        {label: '10 Months', value: 10},
        {label: '11 Months', value: 11},
        ];
    },
    getRepayYear(placeholder) {
      var none = 'Term (All)';

      if(placeholder) {
        none = placeholder;
      }

      return [
        {label: none, value: 0},
        {label: '0 Year', value: 0},
        {label: '1 Year', value: 1},
        {label: '2 Year', value: 2},
        {label: '3 Year', value: 3},
        {label: '4 Year', value: 4},
        {label: '5 Year', value: 5},
        {label: '6 Year', value: 6},
        {label: '7 Year', value: 7},
        {label: '8 Year', value: 8},
        {label: '9 Year', value: 9},
        {label: '10 Year', value: 10},

        
        ];
    },


getLoanPurposes() {
      return [
        {label: 'Home improvements', value: 'Home improvements'},
        {label: 'Debt refinancing', value: 'Debt refinancing'},
        {label: 'Education', value: 'Education'},
        {label: 'Travel', value: 'Travel'},
        {label: 'Investment', value: 'Investment'},
        {label: 'Other', value: 'Other'},
        
      ];
    },

    getLoanYear() {
      return [
        {label: '1 Year', value: 1},
        {label: '2 Year', value: 2},
        {label: '3 Year', value: 3},
        {label: '4 Year', value: 4},
        {label: '5 Year', value: 5},
        {label: '6 Year', value: 6},
        {label: '7 Year', value: 7},
        {label: '8 Year', value: 8},
        {label: '9 Year', value: 9},
        {label: '10 Year', value: 10},
        {label: '11 Year', value: 11},
        {label: '12 Year', value: 12},
        {label: '13 Year', value: 13},
        {label: '14 Year', value: 14},
        {label: '15 Year', value: 15},
        {label: '16 Year', value: 16},
        {label: '17 Year', value: 17},
        {label: '18 Year', value: 18},
        {label: '19 Year', value: 19},
        {label: '20 Year', value: 20},
        {label: '21 Year', value: 21},
        {label: '22 Year', value: 22},
        {label: '23 Year', value: 23},
        {label: '24 Year', value: 24},
        {label: '25 Year', value: 25},
        {label: '26 Year', value: 26},
        {label: '27 Year', value: 27},
        {label: '28 Year', value: 28},
        {label: '29 Year', value: 29},
        {label: '30 Year', value: 30},
        
      ];
    },

    getPropertyType(){
      return [
        {label: 'First home', value: 'First home'},
        {label: 'Vacation home', value: 'Vacation home'},
        {label: 'Rental Property', value: 'Rental Property'}, ]
    },
    /**
     * Get listing purpose options
     *
     * @return {String}
     */
    getPurposes() {
      return [
        {label: 'Purpose (All)'},
        {label: 'Business Acquisition', value: 'Business Acquisition'},
        {label: 'Business Ownership Restructure', value: 'Business Ownership Restructure'},
        {label: 'Expansion Capital', value: 'Expansion Capital'},
        {label: 'Business Acquisition', value: 'Business Acquisition'},
        {label: 'Equipment', value: 'Equipment'},
        {label: 'Inventory', value: 'Inventory'},
        {label: 'Refinancing/Debt Consolodation', value: 'Refinancing/Debt Consolodation'},
        {label: 'Working Capital', value: 'Working Capital'}
      ];
    },




    /**
     * Get listing time options
     *
     * @return {String}
     */
    getTimes() {
      return [
        {label: 'Time Remaining (All)', value: 60},
        {label: 'Less than 12 hours', value: 0.5},
        {label: 'Less than 24 hours', value: 1},
        {label: 'Less than 5 days', value: 5},
        {label: 'Less than 10 days', value: 10},
        {label: 'Less than 30 days', value: 30},
      ];
    },



    /**
     * Get offer amounts
     *
     * @return {String}
     */
    getAmounts(placeholder, listing) {
      var none = 'Minimum Amount (All)';

      var max = listing.admin.basics.investment.max;
      var min = listing.admin.basics.investment.min;

      if(placeholder) {
        none = placeholder;
      }

      var values = [{label: none, value: 0}];

      for (var i = min; i <= max; i = i + 500) {
        var label = $filter('currency')(i);
        var value = i;
        values.push({ label: label, value: value});
      }

      return values;
    },



    /**
     * Save listing page
     *
     * @return {String}
     */
    pageData(listing, page) {

      if( page === 'general' ) {

        var address = {};

        if( listing.general.address ) {
          address = {
            street: listing.general.address.street,
            city: listing.general.address.city,
            province: listing.general.address.province,
            postal: listing.general.address.postal
          };
        }

        return {
          businessName: listing.general.businessName,
      		doingBusinessName: listing.general.doingBusinessName,
      		contactName: listing.general.contactName,
      		email: listing.general.email,
      		phone: listing.general.phone,
      		website: listing.general.website,
      		address: address,
      		founded: listing.general.founded,
      		structure: listing.general.structure,
      		industry: listing.general.industry,
      		naics: listing.general.naics,
      		employees: listing.general.employees
        };

      } else if( page === 'details' ) {

        return {
          title: listing.details.title,
          listingType: listing.details.listingType,
          usage: listing.details.usage,
          term: listing.details.term,
          amount: listing.details.amount,
          jobs: listing.details.jobs,
          loanPartners: listing.details.loanPartners,
          reason: listing.details.reason
        };

      } else if( page === 'financial' ) {

        return {
          businessNumber: listing.financial.businessNumber,
          commercialSpace: listing.financial.commercialSpace,
          owners: listing.financial.owners,
          revenue: listing.financial.revenue,
          projection: listing.financial.projection,
          debt: listing.financial.debt,
          repayments: listing.financial.repayments,
          bankStatements: listing.financial.bankStatements,
          taxReturns: listing.financial.taxReturns,
          whyInvest: listing.financial.whyInvest,
          provideMore: listing.financial.provideMore,
          upToDate: listing.financial.upToDate,
          assets: listing.financial.assets,
          inventory: listing.financial.inventory,
          receivable: listing.financial.receivable,
          liabilities: listing.financial.liabilities,
          financialStatements: listing.financial.financialStatements,
          additionalDocuments: listing.financial.additionalDocuments,
          additionalInfo: listing.financial.additionalInfo
        };

      } else if( page === 'social' ) {

        return {
          managers: listing.social.managers,
          video: listing.social.video,
          facebook: listing.social.facebook,
          twitter: listing.social.twitter,
          linkedin: listing.social.linkedin,
          youtube: listing.social.youtube,
          yelp: listing.social.yelp,
          reviews: listing.social.reviews,
          logo: listing.social.logo,
          images: listing.social.images
        };

      } else if( page === 'terms' ) {

        return {
          businessAgreements: listing.terms.businessAgreements,
          authority: listing.terms.authority,
          moreRequired: listing.terms.moreRequired,
          certified: listing.terms.certified,
          fullName: listing.terms.fullName,
          position: listing.terms.position,
          phone: listing.terms.phone,
          signature: listing.terms.signature
        };

      } else if( page === 'admin' ) {

        return {
          basics: listing.admin.basics,
          underwriting: listing.admin.underwriting,
          scores: listing.admin.scores,
          financials: listing.admin.financials,
          bankStatements: listing.admin.bankStatements
        };

      }

    },


    /**
     * Get listing section status
     *
     * @return {String}
     */
    getPageStatus(page) {
      if( page === 'general' ) {
        return 'incomplete';
      } else if( page === 'details' ) {
        return 'fresh';
      } else if( page === 'financial' ) {
        return 'incomplete';
      } else if( page === 'social' ) {
        return 'complete';
      } else if( page === 'terms' ) {
        return 'incomplete';
      }
    }

  };

  return Listing;
}

angular.module('investnextdoorCaApp')
  .factory('ListingService', ListingService);

})();
