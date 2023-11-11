package com.ashish.personalexpensestracker;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    // fucntions to initialize the room database
    private void initDB() {
        AppDatabase db = AppDatabase.getDbInstance(this.getApplicationContext());
        mDao = db.expenseDao();
    }
}