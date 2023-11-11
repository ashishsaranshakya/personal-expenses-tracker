package com.ashish.personalexpensestracker;

import android.content.Context;

public class AppDatabase extends RoomDatabase{
     private static AppDatabase mInstance;
     private static final String DATABASE_NAME = "expense_db";
     private static final String TABLE_NAME = "expense_table";
     private static final String COLUMN_ID = "id";
     private static final String COLUMN_DATE = "date";
     private static final String COLUMN_CATEGORY = "category";
     private static final String COLUMN_AMOUNT = "amount";
     private static final String COLUMN_DESCRIPTION = "description";
     private static final String COLUMN_TIMESTAMP = "timestamp";

     // funtion to initialize database
        public static AppDatabase getDbInstance(Context context) {
            if (mInstance == null) {
                mInstance = Room.databaseBuilder(context.getApplicationContext(), AppDatabase.class, DATABASE_NAME)
                        .allowMainThreadQueries()
                        .build();
            }
            return mInstance;
        }
}